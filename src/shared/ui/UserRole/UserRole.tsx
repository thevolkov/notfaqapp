import "./UserRole.css"

interface UserRoleProps {
  role: 'user' | 'editor' | 'support' | 'godmode';
  className?: string;
}

export default function UserRole({role = 'user', className}: UserRoleProps) {

  return (
    <div className={`user-role user-role-${role} ${className}`}>
      {role}
    </div>
  )
}