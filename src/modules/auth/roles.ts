
/**
 * 用户角色访问控制路由权限
 */
import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@/utils/enums';
export const ROLE = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE, roles);
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        /**只能 路由级别获取 */
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        /** 既可以从控制器级别获取role也可以从路由，控制器可以设置默认角色*/
        const roles = this.reflector.getAllAndOverride(ROLE, [context.getHandler(), context.getClass()]);

        if (!roles || roles.length === 0) {
            // 如果路由没有设置角色要求，则允许访问
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // 从请求中获取用户信息，这里假设用户信息已经在 JwtStrategy 中解析并存储在请求对象中
        // 检查用户角色是否满足路由要求
        const hasRole = roles.some(role => role == user.role);
        return hasRole;
    }
}


