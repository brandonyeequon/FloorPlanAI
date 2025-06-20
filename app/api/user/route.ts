// User API disabled for frontend-only mode
export async function GET() {
  // Mock user data for UI testing
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'owner'
  };
  return Response.json(mockUser);
}