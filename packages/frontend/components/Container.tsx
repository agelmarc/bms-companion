import cn from "classnames";

interface ContainerProps {
  className?: string;
  children?: any;
  as?: HTMLElement;
  clean?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as = "div",
  clean,
}) => {
  const rootClassName = cn(className, {
    "mx-auto max-w-8xl px-6": !clean,
  });

  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    as as any;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
