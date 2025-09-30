import { Link } from '../link';
import st from './button.module.css';

export function Button({ children, className, ...rest }) {
    return (
        <Link {...rest} className={`${st.button} ${className}`}>
            {children}
        </Link>
    );
};