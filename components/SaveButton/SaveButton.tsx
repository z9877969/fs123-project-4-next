'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
} from '@/lib/api/clientApi';
import AuthModal from '@/components/AuthModal/AuthModal';
import css from './SaveButton.module.css';

import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  recipeId: string;
};

const showToast = async (type: 'success' | 'error', message: string) => {
  const { default: iziToast } = await import('izitoast');
  await import('izitoast/dist/css/iziToast.min.css');
  iziToast[type]({ message, position: 'topRight' });
};

const SaveButton = ({ recipeId }: Props) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: favorites, isLoading: isFavoritesLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoriteRecipes,
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  const isSaved = favorites?.some((r) => r._id === recipeId) ?? false;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      isSaved ? removeFromFavorites(recipeId) : addToFavorites(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      showToast(
        'success',
        isSaved ? 'Removed from favourites' : 'Saved to favourites!'
      );
    },
    onError: () => {
      showToast('error', 'Something went wrong. Please try again.');
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    mutate();
  };

  const isDisabled = isPending || isFavoritesLoading;

  return (
    <>
      <button
        className={`${css.saveButton} ${isSaved ? css.saved : ''}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isPending ? (
          <span className={css.spinner} />
        ) : (
          <>
            <span>{isSaved ? 'Unsave' : 'Save'}</span>
            <span className={css.saveMark}>{isSaved ? '✕' : '✓'}</span>
          </>
        )}
      </button>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default SaveButton;
