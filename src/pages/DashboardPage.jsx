import { useSelector } from 'react-redux';

function DashboardPage() {
  const { user } = useSelector(state => state.user);
  return (
    <div>
      {!user && <h2>This is dashboard</h2>}
      {user && <h2>This is the {user.name}'s dashboard</h2>}
    </div>
  );
}

export default DashboardPage;
