/**
 * 全局启用身份验证
        如果默认情况下应保护绝大多数端点，则可以将身份验证保护注册为 全局守卫，
        而不是在每个控制器顶部使用 @UseGuards() 装饰器，你可以简单地标记哪些路由应该公开。
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/utils';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}

