use super::member::Member;

type Members = Option<Vec<Member>>;

#[allow(non_snake_case)]
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Circle {
    id: String,
    color: String,
    name: String,
    memberCount: String,
    createdAt: String,
    members: Members,
}

impl Circle {
    pub fn id(&self) -> &str {
        &self.id[..]
    }

    pub fn name(&self) -> &str {
        &self.name[..]
    }

    pub fn members(&self) -> &Members {
        &self.members
    }
}

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct Circles {
    circles: Vec<Circle>,
}

impl Circles {
    pub fn iter(&self) -> std::slice::Iter<'_, Circle> {
        self.circles.iter()
    }
}