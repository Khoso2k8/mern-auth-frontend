import { useSelector } from 'react-redux';
function HomePage() {
  const { user } = useSelector(state => state.user);

  return (
    <div>
      <h1>This is Home Page!</h1>
      {user && <span>Welcome {user.name}</span>}
    </div>
  );
}

export default HomePage;
