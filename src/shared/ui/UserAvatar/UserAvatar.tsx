import './UserAvatar.css'

type UserAvatarProps = {
  img: string;
  variant?: 'mini';
}

export default function UserAvatar({img, variant}: UserAvatarProps) {

  return (
    <div className={`user-avatar user-avatar-${variant} d-flex justify-c align-c`}>
      <img src={
        img
          ? img
          : `${import.meta.env.BASE_URL}imgs/no_avatar.jpg`
      } alt="user-avatar" />
    </div>
  )
}
