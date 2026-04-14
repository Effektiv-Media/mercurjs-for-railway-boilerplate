export const Dropdown = ({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) => {
  if (!show) return null;

  return (
    <div className="absolute -right-2 z-20 w-max rounded-sm border border-primary bg-primary text-primary shadow-lg">
      {children}
    </div>
  );
};