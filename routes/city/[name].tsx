import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { CapitalAPI, WeatherAPI } from "../../types.ts";

type Data = {
    city: CapitalAPI,
    weather: WeatherAPI,
}

export const handler: Handlers = {
    GET: async(_req: Request, ctx: FreshContext<unknown, Data>) => {
        const API_KEY = Deno.env.get("API_KEY");
        if(!API_KEY){
        throw new Error("Falta la API_KEY");
        }
        
        const name = ctx.params.name;
        const name_2 = name.replaceAll("%20"," ");
        console.log(name_2);
        
        const URL_API_city = `https://api.api-ninjas.com/v1/city?name=${name_2}`;
        const data_1 = await fetch(URL_API_city,
            {
                headers: {
                    "X-Api-Key": API_KEY,
                }
            }
        );

        /*if(data.status !== 200){
            throw new Error("Error en la API");
        }*/

        const data_capital: CapitalAPI[] = await data_1.json();
        console.log(data_capital[0]);

        const URL_API_weather = `https://api.api-ninjas.com/v1/weather?lat=${data_capital[0].latitude}&lon=${data_capital[0].longitude}`;
        const data_2 = await fetch(URL_API_weather,
            {
                headers: {
                    "X-Api-Key": API_KEY,
                }
            }
        );

        /*if(data.status !== 200){
            throw new Error("Error en la API");
        }*/

        const data_weather: WeatherAPI = await data_2.json();
        console.log(data_weather)
        const capital: Data = {
            city: data_capital[0],
            weather: data_weather,
        }

        return ctx.render(capital);
    }
}

const Page = (props: PageProps<Data>) => {
    return(
        <ul>
            <li><b>Ciudad: </b>{props.data.city.name}</li>
            <li><b>País: </b><a href={`/country/${props.data.city.country}`}>{props.data.city.country}</a></li>
            <li><b>Temperatura: </b>{props.data.weather.temp}</li>
        </ul>
    );
}

export default Page