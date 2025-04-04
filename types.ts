//https://api.api-ninjas.com/v1/validatephone?number=
export type PhoneAPI = {
    is_valid: boolean,
    country: string,
}

export type Phone = {
    phone: string,
    country: string;
}

//https://api.api-ninjas.com/v1/country?name=
export type CountryAPI = {
    name: string,
    capital: string,
}

//https://api.api-ninjas.com/v1/city?name=
export type CapitalAPI = {
    name: string,
    latitude: number,
    longitude: number,
}

//https://api.api-ninjas.com/v1/weather?latitude=&longitude=
export type WeatherAPI = {
    temp: number;
}