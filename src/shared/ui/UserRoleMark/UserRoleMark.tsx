import "./UserRoleMark.css"

interface UserRoleMarkProps {
  role: 'user' | 'editor' | 'support' | 'godmode';
  className?: string;
}

export default function UserRoleMark({role = 'user', className}: UserRoleMarkProps) {

  return (
    <div className={`user-role-mark user-role-mark-${role} ${className}`}>
      {role}
    </div>
  )
}