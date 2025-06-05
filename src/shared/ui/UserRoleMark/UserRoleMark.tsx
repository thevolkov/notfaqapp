import "./UserRoleMark.css"
import type {Role} from '../../../entities/user/userSlice';

interface UserRoleMarkProps {
  role: Role;
  className?: string;
}

export default function UserRoleMark({role = 'user', className}: UserRoleMarkProps) {

  return (
    <div className={`user-role-mark user-role-mark-${role} ${className} blur-bg`}>
      {role}
    </div>
  )
}