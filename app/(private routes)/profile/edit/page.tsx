'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Edit() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.name ?? '');
      setUserEmail(user.email ?? '');
      setUserAvatar(user.avatar ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: userName });
      setUser({
        email: userEmail,
        username: userName,
        avatar: userAvatar,
      });
      router.push('/profile');
    } catch {
      setError('Something went wrong');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {userAvatar && (
          <Image
            src={userAvatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">{userName}</label>
            <input
              onChange={handleChange}
              id="username"
              type="text"
              className={css.input}
              defaultValue={userName}
            />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}
