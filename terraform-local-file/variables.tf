variable "filename" {
  description = "The output filename (relative path only)"
  default     = "terraform-local-file/pets.txt"
}

variable "content"{
  default = "We love all pets equally 🐶🐱"
}

variable "prefix" {
  default = "Mrs"
}

variable "separator" {
  default = "."
}

variable "length" {
  default = "1"
}