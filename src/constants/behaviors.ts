export interface BehaviorNode {
  name: string
  color: string
  label: string
  description: string
}

export const behaviors: BehaviorNode[] = [
  { name: '抬头', color: '#6AFF67', label: 'LookingUp', description: '学生面朝前方，头部抬起或自然姿态' },
  { name: '低头', color: '#AA83FF', label: 'LookingDown', description: '学生低头看桌面或书本' },
  { name: '回头', color: '#63FFF5', label: 'LookingBack', description: '学生转头看后方' },
  { name: '趴桌', color: '#FFF375', label: 'LyingOnDesk', description: '学生上半身趴在桌面上' },
  { name: '站立', color: '#FFAAFF', label: 'Standing', description: '学生处于起立状态' },
  { name: '使用手机', color: '#FF6C6C', label: 'UsingPhone', description: '学生正在操作或查看手机' },
]
