This is user model

{

    firstName: { type: String, minlength: 2, maxlength: 200, required: true },
    lastName: { type: String, minlength: 2, maxlength: 200 },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String },
    password: { type: String, minlength: 8, maxlength: 16, required: true },
    
},

You can use postman collection for your requests (Siz so'rovlaringiz uchun postman collection dan foydalana olasiz)

You send email and password for authenticate 

admin auth
{

    "email":"codemy@gmail.com",
    "password":"codemy"
    
},

user auth
{

    "email":"youremail@gmail.com",
    "password":"yourpassword"
    
}
