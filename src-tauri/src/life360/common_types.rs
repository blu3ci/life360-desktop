#![allow(non_snake_case)]

#[derive(serde::Deserialize, Debug)]
pub struct Location {
    latitude: String,
    longitude: String,
    name: Option<String>,
    address1: String,
    address2: String,
    speed: f32,
    isDriving: String,
}
