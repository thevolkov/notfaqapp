// import { useDispatch, useSelector } from 'react-redux';
// import { type RootState, setCurrentUser } from '../../app/store';
// import IconButton from '../../shared/ui/IconButton/IconButton';
// import './UserSwitcherModal.css';
//
// interface UserSwitcherModalProps {
//   onClose: () => void;
// }
//
// export default function UserSwitcherModal({ onClose }: UserSwitcherModalProps) {
//   const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.user.users);
//
//   const handleSelectUser = (userId: string) => {
//     dispatch(setCurrentUser(userId));
//     onClose();
//   };
//
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="users-list">
//           {users.map((user) => (
//             <div key={user.id} className="user-item">
//               <IconButton
//                 text={user.role}
//                 onClick={() => handleSelectUser(user.id)}
//               />
//             </div>
//           ))}
//         </div>
//         <IconButton iconId="plus" rotate variant="secondary" onClick={onClose} />
//       </div>
//     </div>
//   );
// }
