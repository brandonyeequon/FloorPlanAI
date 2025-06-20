'use server';

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

export async function updateAccount(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // TODO: Implement actual account update logic here
    // For now, just return success
    
    return {
      success: 'Account updated successfully!',
    };
  } catch (error) {
    return {
      error: 'Failed to update account. Please try again.',
    };
  }
}