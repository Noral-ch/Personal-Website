function generateHoverBoxHTML(jsonData) {  
    // 假设jsonData是已经解析过的JSON对象数组  
    if (!Array.isArray(jsonData) || jsonData.length === 0) {  
        return '';  
    }  
  
    // 提取第一个对象（因为我们只关心一个<li>）  
    const data = jsonData[0];  
  
    // 初始化hover_box2的HTML字符串  
    let hoverBoxHTML = '<div class="' + data.hoverBoxClass + '">';  
  
    // 遍历entries数组并构建hover_list2的HTML  
    data.entries.forEach(entry => {  
        hoverBoxHTML += '<div class="' + 'hover_list2' + '"><img src="' + entry.imageUrl + '" alt=""><p>' + entry.title + '</p></div>';  
    });  
  
    // 关闭hover_box2的HTML标签  
    hoverBoxHTML += '</div>';  
  
    // 返回生成的HTML字符串  
    return hoverBoxHTML;  
}  
async function loadAndGenerateHoverBoxHTML(jsonFilePath) {  
    try {  
        // 使用fetch API异步加载JSON文件  
        const response = await fetch(jsonFilePath);  
        if (!response.ok) {  
            throw new Error('Failed to fetch data');  
        }  
  
        // 解析JSON响应为JavaScript对象  
        const jsonData = await response.json();  
  
        // 调用generateHoverBoxHTML函数并打印生成的HTML  
        const hoverBoxHTML = generateHoverBoxHTML(jsonData);  
        console.log(hoverBoxHTML);  
    } catch (error) {  
        console.error('Error:', error);  
    }  
}  
  
// 假设您的JSON文件位于与当前HTML页面相同的服务器上  
const jsonFilePath = '/data/hover_box2.json'; // 注意：这里应该是相对于服务器根目录的路径，而不是客户端文件系统路径  
  
// 调用异步函数  
loadAndGenerateHoverBoxHTML(jsonFilePath);  