import { db } from '@/lib/db';
import { DiscoveryService } from '@workspace/db';

export * from '@workspace/db'; // Re-export types like DiscoveryResult, LeadMetadata, AuthorMetadata
export const discoveryService = new DiscoveryService(db);
