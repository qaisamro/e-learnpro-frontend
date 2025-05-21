// card.jsx
export function Card({ children, className = "", bg = "bg-white" }) {
    return (
      <div className={`${bg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  }