import { Schema, Model, Document, model } from "mongoose";
import { Password } from "../services/password";

// Remember, the interface is a customize type check

// An interface that describes the properties
// that are required tp create a new User
interface UserAttrs {
  email: string
  username: string
  password: string
  balance?: number
  sex?: string
  birthDate?: string
  personalIntro?: string
}

// An interface that describes the properties
// that a User model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends Document {
  email: string
  username: string
  password: string
  balance?: number
  sex?: string
  birthDate?: string
  personalIntro?: string
  createdAt: string
  updatedAt: string
}

// UserModel extends Model<UserDoc>
// first param is a type check for Schema
const userSchema = new Schema(
{
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  sex: {
    type: String,
    default: ''
  },
  birthDate: {
    type: String,
    default: ''
  },
  personalIntro: {
    type: String,
    default: ''
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
userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  next()
})
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = model<UserDoc, UserModel>('User', userSchema)

export { User }