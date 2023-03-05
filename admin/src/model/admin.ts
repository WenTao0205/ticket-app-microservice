import { Schema, Model, Document, model } from "mongoose";
import { Password } from "../services/password";

// Remember, the interface is a customize type check

// An interface that describes the properties
// that are required tp create a new User
interface AdminAttrs {
  username: string
  password: string
}

// An interface that describes the properties
// that a User model has
interface AdminModel extends Model<AdminDoc> {
  build(attrs: AdminAttrs): AdminDoc
}

// An interface that describes the properties
// that a User Document has
interface AdminDoc extends Document {
  username: string
  password: string
  createdAt: string
  updatedAt: string
}

// UserModel extends Model<AdminDoc>
// first param is a type check for Schema
const adminSchema = new Schema(
{
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, 
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      delete ret.__v
    }
  }
}
)
// need to access userSchema's method, can't use arrow function
// call pre() before you use save()
adminSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  next()
})
adminSchema.statics.build = (attrs: AdminAttrs) => new Admin(attrs)

const Admin = model<AdminDoc, AdminModel>('User', adminSchema)

export { Admin }