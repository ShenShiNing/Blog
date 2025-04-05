"use client";

import { useState, useEffect } from "react";

/**
 * 移动设备断点：定义移动设备的最大宽度（像素）
 * 当屏幕宽度小于此值时被视为移动设备
 */
const MOBILE_BREAKPOINT = 768;

/**
 * 检测当前设备是否为移动设备的Hook
 *
 * 特点：
 * - 使用MediaQuery API进行检测，性能更好
 * - 支持服务端渲染(SSR)，避免hydration错误
 * - 自动响应屏幕尺寸变化
 *
 * @returns {boolean} 是否为移动设备（屏幕宽度 < 768px）
 */
export function useIsMobile() {
  // 初始状态设为null，避免服务端渲染与客户端初始渲染不一致
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // 服务端渲染环境没有window对象，需提前返回
    if (typeof window === "undefined") return;

    // 创建媒体查询，检查屏幕是否小于移动设备断点
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // 媒体查询状态变化处理函数
    const onChange = () => setIsMobile(mql.matches);

    // 立即更新状态，确保组件挂载时获得正确值
    setIsMobile(mql.matches);

    // 监听屏幕尺寸变化
    mql.addEventListener("change", onChange);

    // 组件卸载时清理事件监听，防止内存泄漏
    return () => mql.removeEventListener("change", onChange);
  }, []); // 空依赖数组确保effect只运行一次

  // Hydration安全处理：
  // 初始渲染时返回false，确保服务端和客户端渲染结果一致
  // 只有在客户端hydration完成后才返回实际检测结果
  if (isMobile === null) return false;

  return isMobile;
}
