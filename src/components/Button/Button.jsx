import css from './Button.module.css';

export default function Button({ page, onChangePage, isActive }) {
  return (
    <button
      className={css.Button}
      type="button"
      value={page}
      onClick={onChangePage}
      disabled={isActive}
    >
      Load more
    </button>
  );
}
