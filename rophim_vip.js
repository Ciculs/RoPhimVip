/*
 * Quantumult X Script for Rophim VIP Bypass
 * Author: Based on AnhXi's userscript
 * Description: Bypass VIP + Coin trên Rophim
 * 
 * [rewrite_local]
 * ^https?://api\.rofilm\.net/api/app/v1/user/info url script-response-body rophim_vip.js
 * 
 * [mitm]
 * hostname = api.rofilm.net
 */

var body = $response.body;

if (body) {
    try {
        var obj = JSON.parse(body);
        
        // Modify VIP status
        if (obj.hasOwnProperty('is_vip')) {
            obj.is_vip = true;
        }
        
        if (obj.hasOwnProperty('is_verified')) {
            obj.is_verified = true;
        }
        
        // Set VIP expiration to far future (year 2099)
        if (obj.hasOwnProperty('vip_expires_at')) {
            obj.vip_expires_at = 253394586000;
        }
        
        // Set coin balance to max
        if (obj.hasOwnProperty('coin_balance')) {
            obj.coin_balance = 999999999;
        }
        
        // Handle nested data object (common API pattern)
        if (obj.data) {
            if (obj.data.hasOwnProperty('is_vip')) {
                obj.data.is_vip = true;
            }
            if (obj.data.hasOwnProperty('is_verified')) {
                obj.data.is_verified = true;
            }
            if (obj.data.hasOwnProperty('vip_expires_at')) {
                obj.data.vip_expires_at = 253394586000;
            }
            if (obj.data.hasOwnProperty('coin_balance')) {
                obj.data.coin_balance = 999999999;
            }
        }
        
        // Handle user object if exists
        if (obj.user) {
            if (obj.user.hasOwnProperty('is_vip')) {
                obj.user.is_vip = true;
            }
            if (obj.user.hasOwnProperty('is_verified')) {
                obj.user.is_verified = true;
            }
            if (obj.user.hasOwnProperty('vip_expires_at')) {
                obj.user.vip_expires_at = 253394586000;
            }
            if (obj.user.hasOwnProperty('coin_balance')) {
                obj.user.coin_balance = 999999999;
            }
        }
        
        body = JSON.stringify(obj);
    } catch (e) {
        // If JSON parsing fails, use regex replacement (fallback)
        body = body
            .replace(/("is_vip"|"is_verified")\s*:\s*false/g, '$1:true')
            .replace(/("vip_expires_at")\s*:\s*0/g, '$1:253394586000')
            .replace(/("coin_balance")\s*:\s*\d+/g, '"coin_balance":999999999');
    }
}

$done({ body: body });
