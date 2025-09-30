import { useMemo, useState } from 'react';
import { useMediaQuery } from '@darkroom.engineering/hamo';
import st from './grid-debugger.module.css';

export const GridDebugger = () => {
  const [visible, setVisible] = useState(false)
  const isMobile = useMediaQuery('(max-width: 800px)')

  const columns = useMemo(() => {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--layout-columns-count'
      )
    )
  }, [isMobile])

  return (
    <div className={st.grid}>
      <button
        onClick={() => {
          setVisible(!visible)
        }}
      >
        🌐
      </button>
      {visible && (
        <div className={`layout-grid ${st.debugger}`}>
          {new Array(columns).fill(0).map((_, key) => (
            <span key={key}></span>
          ))}
        </div>
      )}
    </div>
  )
};