import { forwardRef } from "react";
import { cn } from "./lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      >
        {src ? (
          <img src={src || "/placeholder.svg"} alt={alt} className="aspect-square h-full w-full" />
        ) : (
          <AvatarFallback>{fallback || alt?.charAt(0) || "?"}</AvatarFallback>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

// ✅ Define AvatarFallback
const AvatarFallback = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center bg-gray-200 text-gray-700", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

// ✅ Define AvatarImage
const AvatarImage = forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => {
    return <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />;
  }
);
AvatarImage.displayName = "AvatarImage";

export { Avatar, AvatarFallback, AvatarImage };
