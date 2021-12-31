import { forwardRef, Ref } from 'react';
import Timer, { TimerType } from './Timer';

const withRefTimer = forwardRef((_, ref) => Timer(_, (ref as Ref<TimerType>)));
export default withRefTimer;
