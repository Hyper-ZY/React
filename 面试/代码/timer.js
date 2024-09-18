import React, { useState, useEffect } from 'react';

function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 启动一个每秒更新的计时器
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // 错误：未清除计时器，导致计时器在组件卸载后继续运行
    // 没有返回 clearInterval(intervalId)

    // 这里应该有清理逻辑
    return () => {
      clearInterval(intervalId); // 清除计时器，避免内存泄漏
    };
  }, []);

  return <div>Timer: {count}</div>;
}

export default TimerComponent;
