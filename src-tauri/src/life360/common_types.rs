#![allow(non_snake_case)]

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Location {
    latitude: String,
    longitude: String,
    name: Option<String>,
    address1: String,
    address2: String,
    speed: f32,
    isDriving: String,
    battery: String,
    charge: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Places {
    places: Vec<Place>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Place {
    id: String,
    name: String,
    longitude: f64,
    latitude: f64,
    radius: f64,
}
