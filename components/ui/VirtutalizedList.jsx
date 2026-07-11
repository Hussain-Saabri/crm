"use client";

import React, { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

export default function VirtualizedList() {
 
  const parentRef = useRef(null)

 
  const items = Array.from({ length: 10000 }, (_, i) => `Row Number ${i + 1}`)

 
  const rowVirtualizer = useVirtualizer({
    count: items.length, 
    getScrollElement: () => parentRef.current, 
    estimateSize: () => 50, 
  })

  return (
    
    <div
      ref={parentRef}
      style={{
        height: '400px',
        width: '100%',
        overflow: 'auto',
        border: '2px solid black'
      }}
    >
      
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
       
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              
              transform: `translateY(${virtualItem.start}px)`, 
            }}
            className="flex items-center px-4 border-b bg-white dark:bg-gray-800"
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
