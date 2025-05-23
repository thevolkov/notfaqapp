import './UserPage.css';
import {useSelector} from 'react-redux';
import {type RootState} from '../../app/store';
import IconButton from '../../shared/ui/IconButton/IconButton';
import {useBackButton} from '../../shared/lib';
import Title from '../../shared/ui/Title/Title.tsx'

export default function UserPage() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const {handleBack} = useBackButton();

  if (!currentUser) return <div>Пользователь не найден</div>;

  return (
    <div className="user-page">
      <Title text={currentUser.name} size="4xl" shadow />
      <div>ID: {currentUser.id}</div>
      <div>Role: {currentUser.role}</div>
      <IconButton
        iconId="arrow-90deg-left"
        text="Back"
        onClick={handleBack}
      />

      {/*<IconButton*/}
      {/*  iconId="pencil"*/}
      {/*  text="Edit name"*/}
      {/*  onClick={() => setIsEditPopupOpen(true)}*/}
      {/*/>*/}

      {/*{*/}
      {/*  isEditPopupOpen && (*/}
      {/*    <Popup*/}
      {/*      title="Edit name"*/}
      {/*      onClose={() => {*/}
      {/*        setIsEditPopupOpen(false);*/}
      {/*        setName('');*/}
      {/*      }}*/}
      {/*      onSubmit={handleSubmit}*/}
      {/*      submitDisabled={!name.trim()}*/}
      {/*    >*/}
      {/*      <label>*/}
      {/*        New name:*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          value={name}*/}
      {/*          onChange={(e) => setName(e.target.value)}*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </Popup>*/}
      {/*  )*/}
      {/*}*/}
    </div>
  );
}
