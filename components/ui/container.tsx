interface ContainerProps {
  children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className=' w-[95%] lg:w-[95%] mx-auto max-w-7xl'>{children}</div>
  );
};
