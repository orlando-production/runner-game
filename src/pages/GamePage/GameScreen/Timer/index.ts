import { forwardRef } from 'react';
import Timer from './Timer';

const withRefTimer = forwardRef((_, ref) => Timer(_, ref));
export default withRefTimer;
