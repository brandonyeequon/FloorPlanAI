// Team API disabled for frontend-only mode
export async function GET() {
  // Mock team data for UI testing
  const mockTeam = {
    id: 1,
    name: 'Test Team',
    planName: 'Free Plan',
    subscriptionStatus: 'active',
    teamMembers: [
      {
        id: 1,
        role: 'owner',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com'
        }
      }
    ]
  };
  return Response.json(mockTeam);
}