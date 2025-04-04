import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Phone, PhoneAPI } from "../types.ts";

type Data = {
  valid: boolean,
  phone_number: Phone,
}

export const handler: Handlers = {
  GET: async(req: Request, ctx: FreshContext<unknown, Data>) => {
    const API_KEY = Deno.env.get("API_KEY");
    if(!API_KEY){
      throw new Error("Falta la API_KEY");
    }

    const url = new URL(req.url);
    const number = url.searchParams.get("number");

    const URL_API = `https://api.api-ninjas.com/v1/validatephone?number=${number}`;
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

    const data_phone: PhoneAPI = await data.json();
    if(data_phone.is_valid){
      const phone_data: Phone = {
        phone: number!,
        country: data_phone.country,
      }
      console.log(phone_data);
      return ctx.render({valid: data_phone.is_valid, phone_number: phone_data});
    }
    else{
      return ctx.render();
    }
  }
}

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <form>
        <input type="text" name="number" placeholder="Inserta el numero de telefono"></input>
        <button type="submit">Buscar</button>
      </form>
      {
        props.data?.valid &&
        <ul>
          <li><b>Teléfono: </b>{props.data?.phone_number.phone}</li>
          <li><b>País: </b><a href={`/country/${props.data?.phone_number.country}`}>{props.data.phone_number.country}</a></li>
        </ul>
      }
    </div>
  );
}

export default Page;