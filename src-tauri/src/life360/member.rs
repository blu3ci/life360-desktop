use super::common_types::Location;

#[allow(non_snake_case)]
#[derive(serde::Deserialize, Debug)]
pub struct Member {
    firstName: String,
    lastName: String,
    location: Location,
}

impl Member {
    pub fn name(&self) -> String {
        format!("{} {}", self.firstName, self.lastName)
    }
}