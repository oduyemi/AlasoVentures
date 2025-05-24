// components/CountdownTimer.tsx
import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';

interface CountdownTimerProps {
  targetDate: Date | string;
}

const getTimeLeft = (target: Date) => {
  const now = new Date().getTime();
  const distance = target.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <HStack spacing={4} mt={4}>
      {Object.entries(timeLeft).map(([label, value]) => (
        <VStack key={label} spacing={0}>
          <Text fontSize="2xl" fontWeight="bold">
            {value.toString().padStart(2, '0')}
          </Text>
          <Text fontSize="sm" textTransform="capitalize" color="gray.400">
            {label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};
