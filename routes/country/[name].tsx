import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { CountryAPI } from "../../types.ts";

type Data = {
    country: CountryAPI,
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
        
        const URL_API = `https://api.api-ninjas.com/v1/country?name=${name_2}`;
        const data = await fetch(URL_API,
            {
                headers: {
                    "X-Api-Key": API_KEY,
                }
            }
        );

        /*if(data.status !== 200){
            throw new Error("Error en la API");
        }*/

        const data_country: CountryAPI[] = await data.json();
        console.log(data_country);

        return ctx.render({country: data_country[0]});
    }
}

const Page = (props: PageProps<Data>) => {
    return(
        <ul>
            <li><b>País: </b>{props.data.country.name}</li>
            <li><b>Capital: </b><a href={`/city/${props.data.country.capital}`}>{props.data.country.capital}</a></li>
        </ul>
    );
}

export default Page