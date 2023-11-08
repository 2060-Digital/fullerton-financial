export default function openEventbriteRegistration(eventId) {
  if (window) {
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      modal: true,
      modalTriggerElementId: `event-${eventId}`,
      onOrderComplete: () => {},
    })
  }
}
