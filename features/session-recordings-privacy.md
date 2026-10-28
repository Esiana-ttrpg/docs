# Session recordings: privacy and consent

Session recordings support campaign memory through playback, chapters, transcripts, and attached audio files. Review this page before creating a recording, and discuss its intended use with participants.

## Consent

The uploader is responsible for informing participants and obtaining the permission needed to upload and share their voices. Discuss who can listen, whether transcription will be used, which services may process audio, and whether backups or campaign clones may contain it.

Each newly created recording requires the uploader to confirm that participants were informed and permission was obtained. Esiana records the acknowledgement time alongside the recording's uploader. This records the uploader's confirmation; it does not collect permission from each participant. Adding files to the same recording does not request another acknowledgement. Older recordings and older backups may have no acknowledgement timestamp.

External API clients must send `consentAcknowledged: true` when creating a recording. Missing, false, or string values are rejected. File uploads continue through the existing resumable upload API without repeating this field.

## Visibility and access

Campaign membership, session access, recording visibility, and operation permissions govern access. The available visibility options are campaign members with session access, authorized narrative staff, and (when enabled) the uploader and authorized campaign managers. Membership alone does not grant every recording operation.

Transcripts follow recording access. Readers see published transcript content; authorized editors can access drafts and revision history. Changing recording visibility affects future access through the application; it cannot recall downloads or independent copies.

## Transcription

Audio may be processed by a configured local service or an external provider. Provider access must be enabled and granted to the campaign, and the requesting member must have permission. Ask the campaign manager or server operator which endpoint is configured before requesting transcription. External providers apply their own processing and retention policies. Manual transcripts and imports can be used without a transcription provider.

## Campaign clones and backups

Recordings are included in a campaign clone only when explicitly selected with the required session history and wiki content. They are not automatically included in every clone. Clones receive independent media copies and do not inherit provider access. Deleting the original does not delete a clone's copy.

Campaign backups can contain audio, recording metadata, chapters, and transcript revisions. Treat backup archives as private campaign data and control where they are stored and shared. Restoring a backup can restore its recording content and acknowledgement timestamps; it does not represent new participant consent.

## Global administrators and server operators

Being a global administrator does not, by itself, grant access to private recordings or transcripts through ordinary content and asset routes. Provider administration exposes operational controls and content-neutral usage information rather than transcript or audio content.

There is a separate disaster-recovery exception: system administrators can export system-database and full-campaign backups without campaign membership. Those requests log the actor and backup scope in the system diagnostic log. These archives may contain private campaign content.

Server operators with infrastructure access may directly access stored audio, databases, credentials, and backups. Application permissions do not prevent infrastructure access. Choose an operator and processing providers whom participants trust.

## Storage and deletion

Audio, transcripts, metadata, and backups consume server storage. The instance sets accepted formats and file, session, and campaign limits; campaigns can impose additional ceilings. The upload dialog displays current accepted formats and upload limits.

Archiving preserves the recording. Detaching a file removes its attachment from the recording. Deleting a recording removes its recording metadata, chapters, transcript revisions, and related records, but retains physical media. Unreferenced audio continues to consume storage until explicitly purged by an authorized administrator. Do not treat recording deletion as immediate physical erasure.

Previously created backups, downloads, provider-retained data, and independent campaign clones may retain copies after deletion. Ask the server operator about backup retention and physical media cleanup, and the configured provider about its retention practices.
