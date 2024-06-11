import { PropsWithChildren, useRef } from "react";

interface PanelProps {
  className: string;
}

const Panel: React.FC<PropsWithChildren<PanelProps>> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={`${className} panel`}>
      <span className="panel-background" ref={ref} />
      {children}
    </div>
  );
};

export default Panel;
