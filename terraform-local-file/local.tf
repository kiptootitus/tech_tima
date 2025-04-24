resource "local_file" "pet" {
  filename = "${path.module}/pets.txt"
  content = "We love all pets equally 🐶🐱"
}

resource "random_pet" "my-pet" {
  prefix = "Mr"
  separator = "."
  length = "1"
}