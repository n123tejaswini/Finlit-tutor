import { useUserStore } from "../store/userStore";

export default function Profile() {
  const { name, xp, level, badges } = useUserStore();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{name}'s Profile</h1>
      <p>Level: {level}</p>
      <p>Total XP: {xp}</p>
      <section>
        <h2 className="font-semibold">Badges</h2>
        {badges.length === 0 ? (
          <p className="text-slate-400">No badges unlocked yet.</p>
        ) : (
          badges.map((b) => <p key={b.key}>{b.label}</p>)
        )}
      </section>
    </div>
  );
}
