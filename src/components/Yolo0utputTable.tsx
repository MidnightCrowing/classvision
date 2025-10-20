// YOLO模型输出表格
import {
  Avatar,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tag,
} from '@fluentui/react-components'
import { ClockRegular } from '@fluentui/react-icons'
import { useEffect, useRef, useState } from 'react'

import { FrostedCard } from '~/components/FrostedCard'

interface DetectionItem {
  id: number
  label: string
  confidence: number
  bbox: [number, number, number, number] // [x, y, w, h]
  timestamp: string
}

const columns = [
  { columnKey: 'id', label: 'ID' },
  { columnKey: 'label', label: '类别' },
  { columnKey: 'confidence', label: '置信度', width: 70 },
  { columnKey: 'bbox', label: '坐标框 [x, y, w, h]', width: 170 },
  { columnKey: 'timestamp', label: '时间' },
]

export default function YoloOutputTable({ ...props }) {
  const [items, setItems] = useState<DetectionItem[]>([])
  const tableBodyRef = useRef<HTMLDivElement>(null)

  // 模拟 YOLO 输出数据
  const generateRandomDetection = (): DetectionItem => {
    const labels = ['LookingUp', 'LookingDown', 'LyingOnDesk', 'LookingBack', 'UsingPhone', 'Standing']
    const label = labels[Math.floor(Math.random() * labels.length)]
    const bbox: [number, number, number, number] = [
      Math.floor(Math.random() * 640),
      Math.floor(Math.random() * 480),
      Math.floor(Math.random() * 200 + 30),
      Math.floor(Math.random() * 200 + 30),
    ]
    return {
      id: Date.now(),
      label,
      confidence: Number.parseFloat((Math.random() * 0.3 + 0.7).toFixed(2)),
      bbox,
      timestamp: new Date().toLocaleTimeString(),
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItem = generateRandomDetection()
        const updated = [...prev, newItem].slice(-15) // 保留最后 15 条
        return updated
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // 当有新数据时滚动到顶部
  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0
    }
  }, [items])

  return (
    <FrostedCard
      title="YOLO 模型输出数据"
      overflow-hidden
      {...props}
    >
      <div
        ref={tableBodyRef}
        w="full"
        truncate
      >
        <Table
          aria-label="YOLO output table"
          size="small"
        >
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHeaderCell
                  key={col.columnKey}
                  style={{
                    color: '#919191',
                    width: col.width ? `${col.width}px` : undefined,
                    minWidth: col.width ? `${col.width}px` : undefined,
                  }}
                >
                  {col.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                {/* ID */}
                <TableCell>{item.id}</TableCell>

                {/* 类别 */}
                <TableCell>
                  <TableCellLayout
                    media={(
                      <Tag
                        shape="circular"
                        media={(
                          <Avatar
                            aria-label={item.label}
                            name={item.label}
                            badge={{
                              status: (['available', 'away', 'busy', 'offline'][
                                Math.floor(Math.random() * 4)
                              ] || 'available') as PresenceBadgeStatus,
                            }}
                          />
                        )}
                        size="extra-small"
                      >
                        {item.label}
                      </Tag>
                    )}
                  >
                  </TableCellLayout>
                </TableCell>

                {/* 置信度 */}
                <TableCell
                  style={{
                    width: `${columns.find(c => c.columnKey === 'confidence')?.width ?? 100}px`,
                    minWidth: `${columns.find(c => c.columnKey === 'confidence')?.width ?? 100}px`,
                  }}
                >
                  {(item.confidence * 100).toFixed(1)}
                  %
                </TableCell>

                {/* 坐标框 [x, y, w, h] */}
                <TableCell
                  style={{
                    width: `${columns.find(c => c.columnKey === 'bbox')?.width ?? 100}px`,
                    minWidth: `${columns.find(c => c.columnKey === 'bbox')?.width ?? 100}px`,
                  }}
                >
                  {item.bbox.map((v, i) => (
                    <Badge
                      key={i}
                      className="mr-6px min-w-32px!"
                      color="brand"
                      appearance="tint"
                      shape="rounded"
                    >
                      {v}
                    </Badge>
                  ))}
                </TableCell>

                {/* 时间 */}
                <TableCell>
                  <div flex="~ row items-center" gap="2px">
                    <ClockRegular className="mt-3px" />
                    {item.timestamp}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </FrostedCard>
  )
}
