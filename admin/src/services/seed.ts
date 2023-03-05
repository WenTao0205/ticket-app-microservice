import { Admin } from "../model/admin"

const InitialAdmin = async () => {
  let count = await Admin.countDocuments({})
  if(count<=0) {
    const user = {
      username: 'admin',
      password: '123456'
    }
    const admin = Admin.build(user)
    await admin.save()
  }
}

export default InitialAdmin