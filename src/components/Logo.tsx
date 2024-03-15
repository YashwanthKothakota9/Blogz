const Logo = ({ width = '100%' }: { width?: string }) => {
  return (
    <img src="/logo-primary.png" style={{ width }} alt="Logo Placeholder" />
  );
};

export default Logo;
