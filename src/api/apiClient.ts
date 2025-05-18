
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { McpClientService } from "@buf/ahmeddarwish_mcp-client-api.bufbuild_es/mcpclient/v1/mcpclient_service_pb"
const transport = createConnectTransport({
  baseUrl: "http://192.168.100.40:9090",
  useHttpGet: true,
});

export const apiClient = createClient(McpClientService, transport);

