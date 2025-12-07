pub mod circles;
pub mod member;
pub mod common_types;

use wreq::Client;
use wreq::header::{self, HeaderValue};
use wreq_util::Emulation;

use circles::{Circles, Circle};

static BASE_URL: &str = "https://api-cloudfront.life360.com/v3";

pub struct Life360 {
    client: Client,
}

impl Life360 {
    pub fn new(token: &str) -> Life360 {
        let mut headers = header::HeaderMap::new();
        headers.insert(header::ACCEPT, HeaderValue::from_static("application/json"));
        headers.insert(header::AUTHORIZATION, HeaderValue::from_str(token).unwrap());

        let client = Client::builder()
            .emulation(Emulation::Chrome142)
            .default_headers(headers)
            .build()
            .unwrap();

        Life360 { client }
    }

    pub async fn get_circles(&self) -> wreq::Result<Circles> {
        let req = self.client.get(format!("{BASE_URL}/circles")).send().await?.json::<Circles>().await?;
        Ok(req)
    }

    pub async fn get_circle_details(&self, circle: &Circle) -> wreq::Result<Circle> {
        let req = self.client.get(format!("{BASE_URL}/circles/{}", circle.id())).send().await?.json::<Circle>().await?;
        Ok(req)
    }
}
